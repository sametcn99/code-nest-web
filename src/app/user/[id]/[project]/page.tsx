export default function Page({
  params,
}: {
  params: { project: string; id: string };
}) {
  return <div>{params.project}</div>;
}
