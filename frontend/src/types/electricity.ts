export interface HourlyData {
    date: string;        
    hour: string;        
    price: number;       
    consumption: number; 
    production: number; 
}

export interface DailyData {
    date: string;               
    avg_daily_price: number;    
    daily_production: number;   
    daily_consumption: number;  
    negative_streak: number;    
    hourly_data: HourlyData[];  
}