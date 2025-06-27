import { EmotionsList } from "@/components/custom/EmotionsList";
import { Header } from "@/components/custom/Header";
import { SubHeaderButtons } from "@/components/custom/SubHeaderButtons";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-8" >
      <Header />
      <SubHeaderButtons />
      <EmotionsList />
    </div>
  )
}