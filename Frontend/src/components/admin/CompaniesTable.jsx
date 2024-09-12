import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  useGetAllCompanies();
  const { searchCompanyByText ,companies } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()
  useEffect(() => {
    if(companies?.length) {
      const filteredCompany = companies.filter((company)=> {
        if(!searchCompanyByText) {
          return true
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      }    
      )
      setFilterCompany(filteredCompany)
    }
  }, [searchCompanyByText,companies ])
  
  const handleClick = (companyId) => {
    console.log(companyId)
    navigate(`/admin/companies/${companyId}`)
  }

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
          {filterCompany?.map((company) => (
            
              <tr key={company._id}>
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
                      <div onClick={() => handleClick(company?._id)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>     
          )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
