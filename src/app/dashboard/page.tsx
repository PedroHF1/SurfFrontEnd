import { Flex } from "@/components/Flex";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-4">
      <div className="col-span-4 grid grid-cols-4 gap-x-4">
        <Card>
          <CardContent>
            <div>
              
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
      </div>
    </section>
  );
}

export default DashboardPage;
