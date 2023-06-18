export type CommentType = {
  id: number;
  post_slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  user_id: string;
  is_approved: number;
};
