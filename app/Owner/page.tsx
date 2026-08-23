import { OwnerGate } from '@/components/page/owner-gate';
import { OwnerContent } from '@/components/page/owner-content';

export const metadata = {
  title: 'Owner — Secret',
  robots: { index: false, follow: false },
};

export default function OwnerPage() {
  return (
    <OwnerGate>
      <OwnerContent />
    </OwnerGate>
  );
}
