import { Template } from '../../contexts/TemplateContext';
import TemplateList from '../TemplateList';

interface TemplateListContainerProps {
  onEdit: (template: Template) => void;
}

export default function TemplateListContainer({ onEdit }: TemplateListContainerProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <TemplateList onEdit={onEdit} />
    </div>
  );
}
