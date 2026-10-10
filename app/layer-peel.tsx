import {useMemo,useState} from 'react';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Input} from '@/components/ui/input';
import {SYSTEMS,peelableElements,plName,type Atlas,type Concept,type Part} from './anatomy';

const LIMIT=60;
interface Props{atlas:Atlas;byId:Map<string,Part>;hidden:Set<string>;hiddenConcepts:Concept[];onSet:(ids:string[],hide:boolean)=>void;onResetLayers:()=>void;onClose:()=>void}

/** Panel „Ściąganie warstw”: odznaczenie struktury ją ściąga, a to, co leżało pod spodem, staje się widoczne. Kości nie są na liście. */
export function LayerPeel({atlas,byId,hidden,hiddenConcepts,onSet,onResetLayers,onClose}:Props){
 const [query,setQuery]=useState('');
 const term=query.trim().toLowerCase();
 /* identyfikatory części bez kości i układ, do którego należy pojęcie (do grupowania) */
 const meta=useMemo(()=>new Map(atlas.concepts.map(c=>{const ids=peelableElements(c.elements,byId);return [c.id,{ids,system:ids.length?byId.get(ids[0])?.system:undefined}] as const;})),[atlas,byId]);
 const found=useMemo(()=>{if(!term)return [];const list=atlas.concepts.filter(c=>meta.get(c.id)!.ids.length>0&&(c.name.toLowerCase().includes(term)||plName(c).toLowerCase().includes(term)||c.id.toLowerCase().includes(term)));list.sort((a,b)=>plName(a).length-plName(b).length||plName(a).localeCompare(plName(b),'pl'));return list;},[atlas,meta,term]);
 const shown=found.slice(0,LIMIT);
 const groups=SYSTEMS.map(s=>({system:s,items:shown.filter(c=>meta.get(c.id)?.system===s.id)})).filter(g=>g.items.length>0);
 /* pole zaznaczone = struktura jest na miejscu; odznaczone = ściągnięta */
 const isOn=(c:Concept)=>{const ids=meta.get(c.id)?.ids??[];return ids.length>0&&ids.every(id=>!hidden.has(id));};
 const row=(c:Concept)=>{const ids=meta.get(c.id)?.ids??[],id=`peel-${c.id}`;return <div className="layer-row" key={c.id}><Checkbox id={id} checked={isOn(c)} onCheckedChange={v=>onSet(ids,!v)}/><label htmlFor={id}>{plName(c)}</label></div>;};
 return <section className="peel-panel glass" aria-label="Ściąganie warstw">
  <div className="panel-heading"><span>Ściąganie warstw</span><Button variant="ghost" className="icon-button" onClick={onClose} aria-label="Zamknij ściąganie warstw"><X size={18}/></Button></div>
  <p className="peel-intro">Odznacz strukturę, aby ją ściągnąć i zobaczyć to, co leży pod nią. Kości zostają na miejscu.</p>
  <Input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="np. pectoralis, rzepka…" aria-label="Szukaj struktury do ściągnięcia"/>
  <div className="layer-list">
   {!term&&(hiddenConcepts.length>0
    ?<><h3>Ściągnięte ({hiddenConcepts.length})</h3>{hiddenConcepts.slice(0,LIMIT).map(row)}</>
    :<p className="layer-note">Wpisz nazwę, aby znaleźć strukturę. Po odznaczeniu zniknie z modelu.</p>)}
   {term&&(groups.length>0
    ?groups.map(g=><div key={g.system.id}><h3>{g.system.name}</h3>{g.items.map(row)}</div>)
    :<p className="layer-note">Brak struktur pasujących do wyszukiwania.</p>)}
   {term&&found.length>LIMIT&&<p className="layer-note">Pokazuję {LIMIT} z {found.length} wyników. Doprecyzuj nazwę.</p>}
  </div>
  <div className="panel-foot"><span>Ściągnięte: {hiddenConcepts.length}</span>{hidden.size>0&&<Button variant="ghost" onClick={onResetLayers}>Przywróć wszystkie</Button>}</div>
 </section>;
}
