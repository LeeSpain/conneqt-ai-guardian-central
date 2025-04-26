
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const PlansComparison = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Feature</th>
                <th className="p-4">Starter</th>
                <th className="p-4">Professional</th>
                <th className="p-4">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Users</td>
                <td className="p-4 text-center">1</td>
                <td className="p-4 text-center">Up to 3</td>
                <td className="p-4 text-center">Up to 10</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Support Level</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center">Priority</td>
                <td className="p-4 text-center">Dedicated</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">AI Features</td>
                <td className="p-4 text-center">Limited</td>
                <td className="p-4 text-center">Advanced</td>
                <td className="p-4 text-center">Full Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansComparison;
