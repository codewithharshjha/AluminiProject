import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "/book1.jpg",
    },
    {
      title: "Valley of life",
      src: "/book8.jpg",
    },
    {
      title: "Sala behta hi jayega",
      src: "/book9.jpg",
    },
    {
      title: "Camping is for pros",
      src: "/book5.jpg",
    },
    {
      title: "The road not taken",
      src: "/book3.jpg",
    },
    {
      title: "The First Rule",
      src: "/book6.jpg",
    },
  ];

  return <FocusCards cards={cards} />;
}
