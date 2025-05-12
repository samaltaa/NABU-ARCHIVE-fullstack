import Image from "next/image";
import SubjectForm from "./components/SubjectForm";
import Grid from "./components/Grid";

export default function Home() {
  return (
    <div>
      <SubjectForm />
      <Grid />
    </div>
  );
}
