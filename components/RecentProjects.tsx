import projectsData from '@/data/projectsData'
import HomePageCard from './HomePageCard'

const RecentProjects = ({ MAX_PROJECTS }) => {
  const projectsList = projectsData.slice(0, MAX_PROJECTS)

  return (
    <div>
      <div className="my-4 mt-8">
        <span className="title-font text-3xl font-bold">Recent Projects</span>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap sm:flex-nowrap">
          {projectsList.map((d) => (
            <HomePageCard
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
              tools={d.tools}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentProjects
