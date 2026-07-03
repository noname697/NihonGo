import { Badge } from "../components/ui/Badge";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { PageHeader } from "../components/ui/PageHeader";

export const Modules = () => {
  return (
    <>
      <Badge variant="red">Badge</Badge>
      <Badge variant="zinc">Badge</Badge>
      <Badge variant="rose">Badge</Badge>
      <PageHeader
        eyebrow="Modules"
        title="Module title"
        description="fewfwfwefwefewfewfwe"
        action="work"
      />
      <LoadingState />
      <ErrorState title="error example" onRetry={() => console.log("ubi")} />

    </>
  );
};
