import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnAuth();

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      {/* {JSON.stringify(data)}
      {data && <Button onClick={() => authClient.signOut()}>Log out </Button>} */}
      protected page
    </div>
  );
};

export default Page;
