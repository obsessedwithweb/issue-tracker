import {z} from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string('Unknown type enterd.').min(1, 'Description is required').max(65535)
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255).optional(),
    description: z.string('Unknown type enterd.').min(1, 'Description is required').max(65535).optional(),
    assignedUserId: z.string().min(1, "UserId is required to assign an issue.").max(65535).optional().nullable(),
});
