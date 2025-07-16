'use client'
import { User } from "@prisma/client"
import { Select, Skeleton } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import { instance as axios } from "@/lib/axios-instance"


const AsigneeSelect = () => {
    const { data: users, error, isFetching, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (isFetching) return <Skeleton />
    if (error) return null

    return (
        <Select.Root>
            <Select.Trigger placeholder="Asign..." />
            <Select.Group>
                <Select.Content>
                    <Select.Label>Suggestions</Select.Label>
                    {
                        users &&
                        users.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))
                    }
                </Select.Content>
            </Select.Group>
        </Select.Root>
    )
}

export default AsigneeSelect
