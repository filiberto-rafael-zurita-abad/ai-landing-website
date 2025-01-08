import { Template } from '../../contexts/TemplateContext';
import TemplateCreatorForm from '../TemplateCreatorForm';

interface TemplateCreatorContainerProps {
  editingTemplate: Template | null;
  onFinishEdit: () => void;
}

export default function TemplateCreatorContainer({ 
  editingTemplate, 
  onFinishEdit 
}: TemplateCreatorContainerProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingTemplate ? 'Edit Template' : 'Template Creator'}
      </h2>
      <TemplateCreatorForm
        editingTemplate={editingTemplate}
        onFinishEdit={onFinishEdit}
      />
    </div>
  );
}
