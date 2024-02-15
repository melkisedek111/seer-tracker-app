import { customBaseQueryHandler } from "@/utils/rtk.utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../global/globalSlice";
import { Omit } from "node_modules/@reduxjs/toolkit/dist/tsHelpers";

type TDepartment = {
	id: number;
	name: string;
    acronym: string;
}

type TCreateDepartment = Omit<TDepartment, "id">;
type TUpdateDepartment = TDepartment;

export const departmentApi = createApi({
	reducerPath: "departmentApi",
	baseQuery: customBaseQueryHandler,
	tagTypes: ["Department"],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getDepartments: builder.query<ApiResponseType<TDepartment[]>, void>({
			query: () => ({
				url: "department/getDepartments",
				method: "GET",
			}),
			providesTags: ['Department'],
		}),
		getDepartment: builder.query<ApiResponseType<TDepartment>, { id: number }>({
			query: (params: { id : number }) => ({
				url: "department/getDepartment",
				params
			}),
			providesTags: ['Department'],
		}),
		createDepartment: builder.mutation<ApiResponseType<TDepartment>, TCreateDepartment>({
			query: (payload: TCreateDepartment) => ({
				url:"department/createDepartment",
				method: "POST",
				body: payload
			}),
			invalidatesTags: ['Department']
		}),
		updateDepartment: builder.mutation<ApiResponseType<TDepartment>, TUpdateDepartment>({
			query: (payload: TUpdateDepartment) => ({
				url:"department/updateDepartment",
				method: "POST",
				body: payload
			}),
			invalidatesTags: ['Department']
		})
	}),
});

export const { useGetDepartmentQuery, useGetDepartmentsQuery, useUpdateDepartmentMutation, useCreateDepartmentMutation } = departmentApi;
