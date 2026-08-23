export type IndustrySector =
  | 'Fluid Power & Pneumatics'
  | 'Pumps & Fluid Handling'
  | 'Motors & Automation Drives'
  | 'Process Valves & Actuation'
  | 'Bearings & Power Transmission'
  | 'Sensors & Industrial IoT'
  | 'Electrical & Switchgear';

export type EvidenceType =
  | 'DIRECT_EXTRACT'
  | 'MODEL_NOMENCLATURE_DECODE'
  | 'INDUSTRY_STANDARD_DEFAULT'
  | 'UNIT_NORMALIZED'
  | 'CROSS_REFERENCED'
  | 'VISION_OCR_INSPECTED';

export interface AttributeEvidence {
  attributeKey: string;
  sourceText?: string;
  sourceLocation?: string; // e.g. "Datasheet Page 1, Section 3" or "Model Code Segment"
  evidenceType: EvidenceType;
  confidence: number; // 0 to 1
  reasoning: string;
}

export interface TechnicalSpec {
  key: string;
  label: string;
  category: 'Mechanical' | 'Electrical' | 'Environmental' | 'Performance' | 'Dimensions' | 'Materials' | 'Standards';
  rawValue: string;
  normalizedValue: number | string;
  unit: string;
  imperialValue?: string;
  tolerance?: string;
  isKeyCommerceFilter: boolean;
  etimFeatureCode?: string; // e.g. EF000004
  evidence?: AttributeEvidence;
  status: 'valid' | 'warning' | 'inferred' | 'overridden';
  warningMessage?: string;
}

export interface CompetitorCrossReference {
  brand: string;
  mpn: string;
  series: string;
  matchType: 'DIRECT_DROP_IN' | 'FUNCTIONAL_EQUIVALENT' | 'UPGRADE_ALTERNATIVE';
  compatibilityScore: number; // 0 to 100
  notes: string;
  keyDeltas: string[];
}

export interface AccessoryOrSpare {
  type: 'MOUNTING' | 'SENSOR_SWITCH' | 'SEAL_KIT' | 'CONNECTOR' | 'CABLE' | 'VALVE_MANIFOLD' | 'COUPLING';
  name: string;
  partNumber: string;
  compatibilityType: 'Required' | 'Recommended' | 'Optional Replacement';
  description: string;
}

export interface ValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  field: string;
  message: string;
  suggestedFix?: string;
  autoFixAvailable?: boolean;
}

export interface ModelCodeSegment {
  segment: string;
  meaning: string;
  decodedValue: string;
}

export type ReviewStatus = 'PENDING_REVIEW' | 'FLAGGED_CONFLICT' | 'AUTO_APPROVED' | 'VERIFIED_READY' | 'SYNDICATED';

export interface IndustrialProduct {
  id: string;
  sku: string;
  mpn: string;
  manufacturer: string;
  productName: string;
  series: string;
  sector: IndustrySector;
  category: string;
  
  // Taxonomies
  unspscCode: string;
  unspscTitle: string;
  etimClassCode: string;
  etimClassVersion: string;
  etimClassTitle: string;
  eclassCode?: string;

  // Commerce & Content
  shortDescription: string;
  marketingSummary: string;
  bulletPoints: string[];
  applications: string[];
  imageUrl?: string;
  cadModelAvailable: boolean;
  datasheetUrl?: string;

  // Technical Breakdown
  specs: TechnicalSpec[];
  modelCodeBreakdown?: ModelCodeSegment[];
  standardsCertifications: string[]; // e.g. ["ISO 15552", "ATEX II 2G", "RoHS 3", "CE", "NEMA 4X"]
  complianceDetails: {
    rohs: boolean;
    reach: boolean;
    ce: boolean;
    atexRating?: string;
    ipRating?: string;
    ulListing?: string;
  };

  // Cross Reference & BOM
  crossReferences: CompetitorCrossReference[];
  accessoriesAndSpares: AccessoryOrSpare[];

  // Traceability & Quality Engine
  overallConfidence: number; // 0 to 100
  completenessScore: number; // 0 to 100
  dataQualityScore: number; // 0 to 100
  validationIssues: ValidationIssue[];
  auditTrail: AttributeEvidence[];

  // Human-in-the-Loop Workflow
  reviewStatus: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  changeHistory?: {
    timestamp: string;
    user: string;
    action: string;
    fieldChanged?: string;
    oldValue?: string;
    newValue?: string;
  }[];

  // Raw source input for grounding
  rawInputSnippet?: string;
  sourceType: 'RAW_TEXT' | 'OCR_NAMEPLATE' | 'PDF_DATASHEET' | 'ERP_CSV_IMPORT' | 'CATALOG_SCRAPE';
  createdAt: string;
  updatedAt: string;
}

export interface BatchProcessingStats {
  totalItems: number;
  processed: number;
  autoApproved: number;
  flaggedForReview: number;
  enrichedAttributesCount: number;
  avgConfidence: number;
  avgDurationMs: number;
  status: 'idle' | 'running' | 'completed' | 'paused';
}
