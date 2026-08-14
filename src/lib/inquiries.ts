import { supabase } from "@/integrations/supabase/client";

export interface InquiryInput {
  name: string;
  business_name?: string;
  industry?: string;
  email?: string;
  phone?: string;
  problem_description: string;
  current_process?: string;
  team_size?: string;
  preferred_contact?: string;
  source?: string;
  chat_summary?: string;
  suggested_solution?: string;
}

export interface ChatHandoffContext {
  problem: string;
  summary: string;
  suggestedSolution: string;
  transcript: string;
}

const HANDOFF_KEY = "aaxiiom.chat.handoff";

export const storeChatHandoff = (context: ChatHandoffContext) => {
  try {
    sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(context));
  } catch {
    /* storage unavailable */
  }
};

export const readChatHandoff = (): ChatHandoffContext | null => {
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY);
    return raw ? (JSON.parse(raw) as ChatHandoffContext) : null;
  } catch {
    return null;
  }
};

export const submitInquiry = async (input: InquiryInput) => {
  const { error } = await supabase.from("inquiries").insert({
    ...input,
    source: input.source ?? "form",
  });
  if (error) throw new Error(error.message);
};
