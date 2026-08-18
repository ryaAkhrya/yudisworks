export interface PortfolioProject {
  id: string;
  category: string;
  title: string;
  status: string;
  isRedacted?: boolean;
}

// Mock server action/utility to simulate fetching data from Supabase
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "proj-1",
      category: "Web Dev",
      title: "Company Profile",
      status: "Live in 3 Days",
    },
    {
      id: "proj-2",
      category: "Makalah",
      title: "Analisis Sistem Basis Data",
      status: "Grade: A",
      isRedacted: true, // Requires redacted visual effect
    },
    {
      id: "proj-3",
      category: "PPT",
      title: "Pitch Deck Startup",
      status: "Cleared",
    },
  ];
}
