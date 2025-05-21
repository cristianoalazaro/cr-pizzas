import { PizzaList } from "@/components/home/pizza-list";
import { Header } from "@/components/layout/header";
import { api } from "@/lib/axios";

export default async function Page() {
  const pizzasReq = await api.get("/pizzas");
  const pizzas = pizzasReq.data.pizzas ?? [];

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10"></main>
      <PizzaList pizzas={pizzas} />
    </div>
  );
}
