import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";

interface SkillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    name: string;
    description: string;
    details: {
      title: string;
      items: string[];
    }[];
  };
}

export function SkillDialog({ isOpen, onClose, skill }: SkillDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            {skill.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <p className="text-gray-600">{skill.description}</p>
          {skill.details.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, i) => (
                  <Badge key={i} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
