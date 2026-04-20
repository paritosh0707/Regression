import { Database, Settings, Link2, Globe } from 'lucide-react';
import TagBadge from '../../components/shared/TagBadge';

export default function DataConfigPanel({ dataAssets }) {
  return (
    <div className="space-y-4">
      {dataAssets.map((asset) => (
        <div key={asset.id} className="card-base p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {asset.type === 'Config' ? (
                <Settings size={16} className="text-appleBlue" />
              ) : (
                <Database size={16} className="text-appleBlue" />
              )}
              <div>
                <h3 className="text-[13px] font-semibold text-dBlue">{asset.name}</h3>
                <span className="text-[11px] text-placeholder">{asset.type}</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <TagBadge label={asset.environment} variant="neutral" />
              <TagBadge label={asset.scope} variant={asset.scope === 'Shared' ? 'default' : 'warning'} />
            </div>
          </div>

          {/* Linked tests */}
          <div className="mb-3">
            <span className="text-[10px] text-placeholder uppercase block mb-1">Linked Tests</span>
            <div className="flex gap-1.5">
              {asset.linkedTests.map((t) => (
                <span key={t} className="text-[11px] font-mono text-appleBlue bg-[rgba(0,122,255,0.08)] px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Variables Table */}
          <div>
            <span className="text-[10px] text-placeholder uppercase block mb-1">Variables / Parameters</span>
            <div className="rounded-lg border border-borderSoft overflow-hidden">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-[#f1f4f7]">
                    <th className="px-3 py-2 text-left text-[10px] font-bold uppercase text-[#4C4C4C]">Key</th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold uppercase text-[#4C4C4C]">Value</th>
                    <th className="px-3 py-2 text-left text-[10px] font-bold uppercase text-[#4C4C4C]">Environment</th>
                  </tr>
                </thead>
                <tbody>
                  {asset.variables.map((v, i) => (
                    <tr key={i} className="border-t border-borderSoft">
                      <td className="px-3 py-2 font-mono text-dBlue">{v.key}</td>
                      <td className="px-3 py-2 font-mono text-[#4C4C4C]">{v.value}</td>
                      <td className="px-3 py-2">
                        <span className="flex items-center gap-1 text-placeholder">
                          <Globe size={10} /> {v.env}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
