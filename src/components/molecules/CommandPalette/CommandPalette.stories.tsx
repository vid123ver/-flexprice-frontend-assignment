import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Search, Home, Users, Receipt, CreditCard, BarChart3, Settings, CodeXml, HelpCircle, ExternalLink } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  group: string;
  icon: any;
  keywords?: string[];
}

const COMMANDS: Command[] = [
  { id: '1', label: 'Go to Dashboard', group: 'Go To', icon: Home, keywords: ['home'] },
  { id: '2', label: 'Go to Customers', group: 'Go To', icon: Users, keywords: ['billing'] },
  { id: '3', label: 'Go to Invoices', group: 'Go To', icon: Receipt, keywords: ['billing'] },
  { id: '4', label: 'Go to Plans', group: 'Go To', icon: CreditCard, keywords: ['pricing'] },
  { id: '5', label: 'Go to Revenue', group: 'Go To', icon: BarChart3, keywords: ['analytics'] },
  { id: '6', label: 'Create new Customer', group: 'Actions', icon: Users, keywords: ['add'] },
  { id: '7', label: 'Create new Plan', group: 'Actions', icon: CreditCard, keywords: ['add'] },
  { id: '8', label: 'Create Invoice', group: 'Actions', icon: Receipt, keywords: ['add'] },
  { id: '9', label: 'API Documentation', group: 'Documentation', icon: ExternalLink, keywords: ['docs'] },
  { id: '10', label: 'Help Center', group: 'Help', icon: HelpCircle, keywords: ['support'] },
  { id: '11', label: 'Settings', group: 'Go To', icon: Settings, keywords: ['config'] },
  { id: '12', label: 'Developer Tools', group: 'Go To', icon: CodeXml, keywords: ['api'] },
];

interface CommandPaletteProps {
  open?: boolean;
  onClose?: () => void;
}

const CommandPalette = ({ open = true, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = COMMANDS.filter(cmd => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return cmd.label.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q) ||
      cmd.keywords?.some(k => k.includes(q));
  });

  const groups = [...new Set(filtered.map(c => c.group))];

  useEffect(() => { setSelected(0); }, [search]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') setSelected(p => Math.min(p + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(p => Math.max(p - 1, 0));
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [filtered.length, onClose]);

  if (!open) return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif' }}>
      <p style={{ color: '#6b7280', fontSize: '13px' }}>Press <kbd style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>CMD+K</kbd> to open</p>
    </div>
  );

  let itemIndex = 0;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '120px', zIndex: 50, fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '12px', width: '560px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
          <Search size={16} color="#9ca3af" />
          <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search features, plans, customers..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#111827', background: 'transparent' }} />
          <kbd style={{ fontSize: '11px', color: '#9ca3af', background: '#f9fafb', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>Esc</kbd>
        </div>
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#9ca3af', padding: '32px', fontSize: '13px' }}>No results found.</p>}
          {groups.map(group => (
            <div key={group}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '8px 10px 4px' }}>{group}</p>
              {filtered.filter(c => c.group === group).map(cmd => {
                const Icon = cmd.icon;
                const isSelected = itemIndex++ === selected;
                return (
                  <div key={cmd.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', background: isSelected ? '#f3f4f6' : 'transparent', fontSize: '13px' }}>
                    <Icon size={14} color="#6b7280" />
                    <span>{cmd.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 16px', borderTop: '1px solid #f3f4f6', fontSize: '11px', color: '#9ca3af', display: 'flex', gap: '12px' }}>
          <span>↑↓ Navigate</span><span>Enter Select</span><span>Esc Close</span>
        </div>
      </div>
    </div>
  );
};

const InteractiveCommandPalette = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(p => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif' }}>
      <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', background: '#092E44', color: 'white', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '13px' }}>
        Open Command Palette
      </button>
      <p style={{ marginTop: '12px', color: '#6b7280', fontSize: '13px' }}>Or press CMD+K</p>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof CommandPalette> = {
  title: 'Molecules/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = { args: { open: true } };
export const Closed: Story = { args: { open: false } };
export const WithSearch: Story = {
  render: () => <CommandPalette open={true} />,
};
export const Interactive: Story = {
  render: () => <InteractiveCommandPalette />,
};
