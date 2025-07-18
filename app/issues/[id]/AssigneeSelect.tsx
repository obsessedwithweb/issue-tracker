"use client";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { instance as axios } from "@/lib/axios-instance";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isFetching,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isFetching) return <Skeleton height="2rem" />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    fetch("/api/issues/" + issue.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignedUserId: userId == "unassigned" ? null : userId,
      }),
    }).then(res => res.json())
      .then(() => toast.success('User Changed'))
      .catch(() => {
        toast.error("Couldn\'t make the cahanges!")
      })
  };

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedUserId ?? "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Asign..." />
        <Select.Group>
          <Select.Content>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users &&
              users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Group>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
