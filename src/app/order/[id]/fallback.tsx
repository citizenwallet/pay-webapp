"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Flex } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailFallback() {
    return (
        <div className="relative flex min-h-screen w-full flex-col align-center p-4 max-w-xl">
            {/* Back Navigation Skeleton */}
            <div className="mb-6">
                <div className="inline-flex items-center text-sm text-gray-600">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            <Card className="shadow-lg border-0">
                {/* Header Section Skeleton */}
                <CardHeader className="pb-4">
                    <Flex direction="column" gap="4">
                        {/* Order Title Skeleton */}
                        <Skeleton className="h-8 w-32" />

                        {/* Place Profile Section Skeleton */}
                        <Flex align="center" gap="4" className="p-4 bg-gray-50 rounded-lg">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <Flex direction="column" gap="2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-32" />
                            </Flex>
                        </Flex>
                    </Flex>
                </CardHeader>

                {/* Body Section Skeleton */}
                <CardContent className="space-y-6">
                    {/* Amount and Status Row Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Skeleton className="h-5 w-5" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Skeleton className="h-5 w-5" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-12" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </div>

                    {/* Date Section Skeleton */}
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <Skeleton className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                    </div>

                    {/* Items Section Skeleton */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            {/* Skeleton for 3 items */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-16 ml-4" />
                                    </div>
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            ))}

                            {/* Total Skeleton */}
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-5 w-12" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section Skeleton */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
