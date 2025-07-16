'use client'
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"


const AsigneeSelect = ({ users }: { users: User[] }) => {
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
