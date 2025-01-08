import { useState } from 'react';
import { Template } from '../../contexts/TemplateContext';
import EmailFormContainer from './EmailFormContainer';
import TemplateCreatorContainer from './TemplateCreatorContainer';
import TemplateListContainer from './TemplateListContainer';

export default function TemplateSenderSection() {
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <EmailFormContainer />
        <TemplateCreatorContainer
          editingTemplate={editingTemplate}
          onFinishEdit={() => setEditingTemplate(null)}
        />
      </div>
      <TemplateListContainer onEdit={setEditingTemplate} />
    </div>
  );
}
