export default function Page({ params }: { params: { project: string } }) {
    return <div>{params.project}</div>;
  }
  