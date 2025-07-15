'use client'

import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"


const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter()
  return (
    <AlertDialog.Root>

      <AlertDialog.Trigger>
        <Button color="red">Delete issue</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content > {/*maxWidth="450px"*/}

        <AlertDialog.Title>Revoke access</AlertDialog.Title>

        <AlertDialog.Description size="2">
          Are you sure? This issue will no longer be accessible and any
          existing data will be deleted.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={async () => {
                await axios.delete('/api/issues/' + issueID)
                router.push('/issues')
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton

