import { projects } from '@/data/site';
import { ProjectCard } from './ProjectCard';

export function WorkIndex({ priorityFirst = false }: { priorityFirst?: boolean }) {
  return (
    <div className="work-grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} priority={priorityFirst && i === 0} />
      ))}
    </div>
  );
}
