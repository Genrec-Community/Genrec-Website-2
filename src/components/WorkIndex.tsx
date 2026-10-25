import { projects } from '@/data/site';
import { ProjectCard } from './ProjectCard';

export function WorkIndex() {
  return (
    <div className="work-grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
