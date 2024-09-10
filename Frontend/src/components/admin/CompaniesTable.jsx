import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useSelector } from "react-redux";

function CompaniesTable() {
  useGetAllCompanies();
  const { companies } = useSelector(state => state.company);
  console.log("allCompanies  data", companies)

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length <= 0 ? (
            <span>You haven't registered any company yet</span>
          ) : (
            <div className="flex">
              {companies?.map((company) => {
                return (
                  <tr>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company?.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div className="flex items-center gap-2 w-fit cursor-pointer">
                            <Edit2 />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr>
                );
              })}
            </div>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
