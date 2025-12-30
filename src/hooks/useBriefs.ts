import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CalculatorFormData } from "./useCalculatorForm";
import { calculateCockpitResult } from "@/utils/calculations";

export function useSaveBrief() {
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (formData: CalculatorFormData) => {
            // MOCKED SAVE: No Database Interaction
            console.log("Mock Save Brief:", formData);
            return { id: 'mock-brief-id' };
        },
        onSuccess: () => {
            toast({
                title: "Brief Saved (Local)",
                description: "Data synced locally. Database disabled.",
            });
        },
        onError: (error) => {
            toast({
                title: "Sync Error",
                description: error.message,
                variant: "destructive",
            });
        }
    });
}
