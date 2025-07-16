import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { editorJSToHTML, htmlToEditorJS } from "@/utils/editorjs-to-html";
import type { BlogPost, BlogPostWithDetails, Category, Author } from "@shared/schema";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL"),
  categoryId: z.number(),
  authorId: z.number(),
  readTime: z.number().min(1),
  featured: z.boolean(),
  publishedAt: z.string(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditor() {
  const [, setLocation] = useLocation();
  const [isEditMode, params] = useRoute("/admin/posts/:id/edit");
  const [isNewMode] = useRoute("/admin/posts/new");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const postId = params?.id ? parseInt(params.id) : null;

  const { data: post, isLoading: postLoading } = useQuery<BlogPostWithDetails>({
    queryKey: [`/api/blog-posts/${postId}`],
    enabled: !!postId && isEditMode,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: authors = [] } = useQuery<Author[]>({
    queryKey: ["/api/authors"],
  });

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      categoryId: categories[0]?.id || 1,
      authorId: authors[0]?.id || 1,
      readTime: 5,
      featured: false,
      publishedAt: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (post && isEditMode) {
      // Convert HTML content back to EditorJS format for editing
      const editorContent = htmlToEditorJS(post.content);
      
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: JSON.stringify(editorContent),
        image: post.image,
        categoryId: post.categoryId,
        authorId: post.authorId,
        readTime: post.readTime,
        featured: post.featured,
        publishedAt: new Date(post.publishedAt).toISOString().split('T')[0],
      });
    }
  }, [post, isEditMode, form]);

  // Auto-generate slug from title
  const title = form.watch("title");
  useEffect(() => {
    if (title && !isEditMode) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  }, [title, isEditMode, form]);

  const createMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      // Convert EditorJS data to HTML for storage
      let htmlContent = data.content;
      try {
        const editorData = JSON.parse(data.content);
        if (editorData.blocks) {
          htmlContent = editorJSToHTML(editorData);
        }
      } catch {
        // If it's already HTML, keep as is
      }
      
      const response = await apiRequest("POST", "/api/blog-posts", {
        ...data,
        content: htmlContent,
        publishedAt: new Date(data.publishedAt),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Post created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error creating post", 
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      // Convert EditorJS data to HTML for storage
      let htmlContent = data.content;
      try {
        const editorData = JSON.parse(data.content);
        if (editorData.blocks) {
          htmlContent = editorJSToHTML(editorData);
        }
      } catch {
        // If it's already HTML, keep as is
      }
      
      const response = await apiRequest("PUT", `/api/blog-posts/${postId}`, {
        ...data,
        content: htmlContent,
        publishedAt: new Date(data.publishedAt),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Post updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: [`/api/blog-posts/${postId}`] });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error updating post", 
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? "Update your blog post" : "Write a new blog post"}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setLocation("/admin")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      {...form.register("title")}
                      placeholder="Enter post title"
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      {...form.register("slug")}
                      placeholder="post-url-slug"
                    />
                    {form.formState.errors.slug && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.slug.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      {...form.register("excerpt")}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                    {form.formState.errors.excerpt && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.excerpt.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <div className="mt-2">
                      <RichTextEditor
                        content={form.watch("content") || ""}
                        onChange={(content) => form.setValue("content", content)}
                        placeholder="Write your post content here..."
                      />
                    </div>
                    {form.formState.errors.content && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.content.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="categoryId">Category</Label>
                    <Select 
                      value={form.watch("categoryId")?.toString()} 
                      onValueChange={(value) => form.setValue("categoryId", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="authorId">Author</Label>
                    <Select 
                      value={form.watch("authorId")?.toString()} 
                      onValueChange={(value) => form.setValue("authorId", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map(author => (
                          <SelectItem key={author.id} value={author.id.toString()}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="readTime">Read Time (minutes)</Label>
                    <Input
                      id="readTime"
                      type="number"
                      {...form.register("readTime", { valueAsNumber: true })}
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="publishedAt">Publish Date</Label>
                    <Input
                      id="publishedAt"
                      type="date"
                      {...form.register("publishedAt")}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={form.watch("featured")}
                      onCheckedChange={(checked) => form.setValue("featured", checked)}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      {...form.register("image")}
                      placeholder="https://example.com/image.jpg"
                    />
                    {form.formState.errors.image && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.image.message}
                      </p>
                    )}
                  </div>
                  {form.watch("image") && (
                    <div className="mt-4">
                      <img
                        src={form.watch("image")}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : (isEditMode ? "Update Post" : "Create Post")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}