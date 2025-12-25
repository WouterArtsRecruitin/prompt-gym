import PromptGym from '../components/PromptGym';

export const metadata = {
  title: 'Prompt Gym | Test je AI Skills',
  description: 'Interactieve AI training game voor recruiters. Leer effectieve prompts schrijven voor CV screening, vacatureteksten en sourcing.',
};

export default function GamePage() {
  return (
    <main>
      <PromptGym />
    </main>
  );
}
