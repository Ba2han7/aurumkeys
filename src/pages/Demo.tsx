import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Play, Edit, Save, X } from "lucide-react";

const Demo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();
      
      setIsAdmin(!error && !!data);
    };

    checkAdminRole();
  }, [user]);

  // Fetch active demo videos
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['demo-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('demo_videos')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Update video mutation
  const updateVideoMutation = useMutation({
    mutationFn: async (updatedVideo: any) => {
      const { error } = await supabase
        .from('demo_videos')
        .update({
          title: updatedVideo.title,
          video_url: updatedVideo.video_url,
          description: updatedVideo.description,
        })
        .eq('id', updatedVideo.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-videos'] });
      toast.success('Video updated successfully');
      setEditMode(false);
      setEditingVideo(null);
    },
    onError: () => {
      toast.error('Failed to update video');
    },
  });

  const handleEditStart = (video: any) => {
    setEditingVideo({ ...video });
    setEditMode(true);
  };

  const handleEditSave = () => {
    if (!editingVideo) return;
    updateVideoMutation.mutate(editingVideo);
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditingVideo(null);
  };

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
        <Footer />
      </div>
    );
  }

  const activeVideo = videos[0];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
              Product Demo
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience our premium collection in action
            </p>
          </div>

          {activeVideo ? (
            <div className="space-y-8">
              {/* Video Player */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getEmbedUrl(activeVideo.video_url)}
                      title={activeVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Video Info */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl">
                    {editMode ? (
                      <Input
                        value={editingVideo?.title || ''}
                        onChange={(e) => setEditingVideo(prev => ({ ...prev, title: e.target.value }))}
                        className="text-2xl font-bold"
                      />
                    ) : (
                      activeVideo.title
                    )}
                  </CardTitle>
                  {isAdmin && (
                    <div className="flex gap-2">
                      {editMode ? (
                        <>
                          <Button
                            onClick={handleEditSave}
                            disabled={updateVideoMutation.isPending}
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={handleEditCancel}
                            variant="outline"
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleEditStart(activeVideo)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Video URL</label>
                        <Input
                          value={editingVideo?.video_url || ''}
                          onChange={(e) => setEditingVideo(prev => ({ ...prev, video_url: e.target.value }))}
                          placeholder="YouTube video URL or embed URL"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                          value={editingVideo?.description || ''}
                          onChange={(e) => setEditingVideo(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {activeVideo.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="text-center">
                <Button 
                  variant="premium" 
                  size="lg" 
                  onClick={() => window.location.href = '/explore'}
                  className="hover-lift"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Explore Our Collection
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No demo video available</h3>
                <p className="text-muted-foreground mb-6">
                  We're working on creating an amazing demo for you.
                </p>
                {isAdmin && (
                  <Button variant="outline">
                    Add Demo Video
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;