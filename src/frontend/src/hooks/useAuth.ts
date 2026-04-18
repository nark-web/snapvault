import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { apiProfileGet, apiProfileSave } from "../lib/api";
import type { UpdateProfileInput } from "../types";

export function useAuth() {
  const {
    identity,
    loginStatus,
    login,
    clear,
    isAuthenticated: iiAuthenticated,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const isAuthenticated = iiAuthenticated;
  const isLoading = loginStatus === "initializing" || actorFetching;

  return {
    identity,
    loginStatus,
    isAuthenticated,
    isLoading,
    login,
    logout: clear,
    actor,
  };
}

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiProfileGet(actor),
    enabled: !!actor && !isFetching,
  });

  const saveMutation = useMutation({
    mutationFn: (input: UpdateProfileInput) => apiProfileSave(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
    save: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveError: saveMutation.error,
  };
}
