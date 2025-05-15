import Image from "next/image";
import SubjectForm from "./components/SubjectForm";
import Grid from "./components/Grid";
import ThemeProvider from "./providers/ThemeProvider";

export default function Home() {
  return (
    <div>
      <ThemeProvider>
        <SubjectForm />
        <Grid />
      </ThemeProvider>
    </div>
  );
}
