import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";

interface SkillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    name: string;
    icon: string;
    description: string[];
    experience: string[];
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 p-2 overflow-hidden border-2 border-black/50">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              {skill.description.map((line, index) => (
                <p key={index} className="text-gray-600">
                  {line.startsWith("**") && line.endsWith("**") ? (
                    <span className="font-bold">{line.slice(2, -2)}</span>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Key Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skill.experience.map((item, i) => (
                <Badge key={i} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
