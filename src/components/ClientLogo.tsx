import boschLogo from '@/assets/logos/bosch.svg';
import cargillLogo from '@/assets/logos/cargill.svg';
import qpiaiLogo from '@/assets/logos/qpiai.svg';
import siemensLogo from '@/assets/logos/siemens.svg';
import compassDigitalLogo from '@/assets/logos/compass-digital.svg';
import fordLogo from '@/assets/logos/ford.svg';
import intelLogo from '@/assets/logos/intel.svg';
import neomLogo from '@/assets/logos/neom.svg';

const LOGOS: Record<string, string> = {
  bosch: boschLogo,
  cargill: cargillLogo,
  qpiai: qpiaiLogo,
  siemens: siemensLogo,
  'compass-digital': compassDigitalLogo,
  ford: fordLogo,
  intel: intelLogo,
  neom: neomLogo,
};

/** Client logo with its name as text, so it's always identifiable. */
const ClientLogo = ({ logo, client, className = '' }: { logo?: string; client?: string; className?: string }) => {
  if (!client) return null;
  const src = logo ? LOGOS[logo] : undefined;
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium text-foreground ${className}`}>
      {src && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white border p-1 flex-none">
          <img src={src} alt="" className="w-full h-full object-contain" />
        </span>
      )}
      {client}
    </span>
  );
};

export default ClientLogo;
