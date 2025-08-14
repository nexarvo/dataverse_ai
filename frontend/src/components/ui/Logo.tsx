import { cn } from "@/lib/utils";
import Image from "next/image";

// PostgreSQL Logo
export function PostgreSQL({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://www.postgresql.org/media/img/about/press/elephant.png"
        alt="PostgreSQL"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// MongoDB Logo
export function MongoDB({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png"
        alt="MongoDB"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// MySQL Logo
export function MySQL({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://www.mysql.com/common/logos/logo-mysql-170x115.png"
        alt="MySQL"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// Snowflake Logo
export function Snowflake({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://www.snowflake.com/wp-content/themes/snowflake/assets/img/logo-blue.svg"
        alt="Snowflake"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// BigQuery Logo
export function BigQuery({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg"
        alt="BigQuery"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// Redshift Logo
export function Redshift({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Amazon-Redshift-Logo.svg/1862px-Amazon-Redshift-Logo.svg.png"
        alt="Redshift"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// Excel Logo
export function Excel({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
        alt="Excel"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// Google Sheets Logo
export function GoogleSheets({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png"
        alt="Google Sheets"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// Salesforce Logo
export function Salesforce({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png"
        alt="Salesforce"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}

// HubSpot Logo
export function HubSpot({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="https://www.hubspot.com/hubfs/HubSpot_Logos/HSLogo_color.svg"
        alt="HubSpot"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
}
