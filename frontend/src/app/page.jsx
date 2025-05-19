import Image from "next/image";
import SubjectForm from "./components/SubjectForm";
import Grid from "./components/Grid";
import ThemeProvider from "./providers/ThemeProvider";
import Login from "./components/Login";


export default function Home() {
  return (
    <div>
      <ThemeProvider>
          //children components
          <Login />
      </ThemeProvider>
    </div>
  );
}
