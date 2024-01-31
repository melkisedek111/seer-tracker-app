import { customBaseQueryHandler } from "@/utils/rtk.utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../global/globalSlice";
import { PositionState } from "./positionSlice";
import { Omit } from "node_modules/@reduxjs/toolkit/dist/tsHelpers";
import { url } from "inspector";

type Position = {
	id: number;
	name: string;
}

type CreatePosition = Omit<Position, "id">;
type UpdatePosition = Position;

export const positionApi = createApi({
	reducerPath: "positionApi",
	baseQuery: customBaseQueryHandler,
	tagTypes: ["Position"],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getPositions: builder.query<ApiResponseType<Position[]>, void>({
			query: () => ({
				url: "position/getPositions",
				method: "GET",
			}),
			providesTags: ['Position'],
		}),
		getPosition: builder.query<ApiResponseType<Position>, { id: number }>({
			query: (params: { id : number }) => ({
				url: "position/getPosition",
				params
			}),
			providesTags: ['Position'],
		}),
		createPosition: builder.mutation<ApiResponseType<Position>, CreatePosition>({
			query: (payload: CreatePosition) => ({
				url:"position/create",
				method: "POST",
				body: payload
			}),
			invalidatesTags: ['Position']
		}),
		updatePosition: builder.mutation<ApiResponseType<Position>, UpdatePosition>({
			query: (payload: UpdatePosition) => ({
				url:"position/updatePosition",
				method: "POST",
				body: payload
			}),
			invalidatesTags: ['Position']
		})
	}),
});

export const { useGetPositionsQuery, useCreatePositionMutation, useUpdatePositionMutation, useGetPositionQuery } = positionApi;
