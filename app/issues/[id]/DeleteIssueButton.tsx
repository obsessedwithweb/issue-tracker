'use client'

import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const [error, setError] = useState(false)
  const router = useRouter()

  const deleteIssue = async () => {
    try {
      await axios.delete('/api/issues/' + issueID)
      router.push('/issues')
    } catch (_) {
      setError(true)
    }
  }

  return (
    <>
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
                onClick={deleteIssue}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted, try again later.</AlertDialog.Description>
          <Button
            variant="soft" color="gray"
            onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton

