"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Sparkles, Building2, AtSign, Link, Zap, Radio, Share2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

interface ActionsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ActionsSidebar({ isOpen, onClose }: ActionsSidebarProps) {
  const [activeTab, setActiveTab] = useState("enrichments")

  if (!isOpen) return null

  return (
    <nav
      className="border-l border-white/10 w-[480px] flex h-full flex-col bg-background"
      data-width="medium"
      data-variant="docked"
    >
      <div className="flex h-full">
        <div className="flex max-h-[inherit] w-full flex-col overflow-x-hidden">
          {/* Header */}
          <div className="flex w-full flex-shrink-0 items-center gap-2 border-b border-white/10 min-h-0 py-2 pr-2 pl-4">
            <h5 className="text-sm font-semibold tracking-tight text-foreground">Actions</h5>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="ml-auto h-8 bg-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex h-full min-h-0 flex-col">
            {/* Search */}
            <div className="flex flex-col w-full border-b border-white/10">
              <div className="w-full border-b border-white/10 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-9 h-10 border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-white/20" />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 px-4 py-3">
                <Button
                  variant={activeTab === "sources" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("sources")}
                  className={`flex-1 h-20 flex-col gap-2 ${activeTab === "sources" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                >
                  <Search className="size-5" />
                  <span className="text-xs">Sources</span>
                </Button>
                <Button
                  variant={activeTab === "enrichments" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("enrichments")}
                  className={`flex-1 h-20 flex-col gap-2 ${activeTab === "enrichments" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                >
                  <Zap className="size-5" />
                  <span className="text-xs">Enrichments</span>
                </Button>
                <Button
                  variant={activeTab === "signals" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("signals")}
                  className={`flex-1 h-20 flex-col gap-2 ${activeTab === "signals" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                >
                  <Radio className="size-5" />
                  <span className="text-xs">Signals</span>
                </Button>
                <Button
                  variant={activeTab === "exports" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("exports")}
                  className={`flex-1 h-20 flex-col gap-2 ${activeTab === "exports" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                >
                  <Share2 className="size-5" />
                  <span className="text-xs">Exports</span>
                </Button>
              </div>
            </div>

            {/* Enrichments List */}
            {activeTab === "enrichments" && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {/* Suggested Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between mb-4 text-foreground hover:bg-white/5">
                        Suggested
                        <ChevronDown className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border-white/10">
                      <DropdownMenuItem className="focus:bg-white/10">Suggested</DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/10">All Integrations</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Enrichment Items */}
                  <div className="space-y-2">
                    {/* Use AI */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-white/10 transition-colors">
                      <div className="p-2 rounded bg-purple-500/20">
                        <Sparkles className="size-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-semibold text-foreground">Enrich with AI</h6>
                          <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">AI Tokens</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Generate content or analyze data using LLMs</p>
                      </div>
                    </div>

                    {/* Company Data */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-white/10 transition-colors">
                      <div className="p-2 rounded bg-blue-500/20">
                        <Building2 className="size-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-semibold text-foreground">Company Data</h6>
                          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Data Credits</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Fetch firmographics, funding, and tech stack</p>
                      </div>
                    </div>

                    {/* Person Data */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-white/10 transition-colors">
                      <div className="p-2 rounded bg-green-500/20">
                        <AtSign className="size-5 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-semibold text-foreground">Person Data</h6>
                          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Data Credits</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Find contact info, job history, and social profiles</p>
                      </div>
                    </div>

                    {/* Email Validation */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-white/10 transition-colors">
                      <div className="p-2 rounded bg-orange-500/20">
                        <Zap className="size-5 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-semibold text-foreground">Email Validation</h6>
                          <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">Utility Credits</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Verify email deliverability and reduce bounce rates
                        </p>
                      </div>
                    </div>

                    {/* Address Geocoding */}
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-white/10 transition-colors">
                      <div className="p-2 rounded bg-pink-500/20">
                        <Link className="size-5 text-pink-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-semibold text-foreground">Address Geocoding</h6>
                          <span className="text-xs text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">Utility Credits</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Convert addresses to coordinates and vice versa</p>
                      </div>
                    </div>
                  </div>

                  {/* View All Link */}
                  <Button variant="link" className="w-full mt-4 text-muted-foreground hover:text-foreground">
                    View all integrations
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
