import TestPrivateFetch from "@/components/delete_test/TestPrivateFetch";
import TestServerFetch from "@/components/delete_test/TestServerFetch";

export default function Home() {
  return (
    <div className="flex gap-2">
      <TestServerFetch />
      <hr />
      <TestPrivateFetch />
    </div>
  );
}
