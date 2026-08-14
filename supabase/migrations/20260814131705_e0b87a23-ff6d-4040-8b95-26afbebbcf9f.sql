CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text,
  industry text,
  email text,
  phone text,
  problem_description text NOT NULL,
  current_process text,
  team_size text,
  preferred_contact text,
  source text NOT NULL DEFAULT 'form',
  chat_summary text,
  suggested_solution text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
ON public.inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);