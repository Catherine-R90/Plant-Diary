<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PlantDownloader extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'download-plants';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Steal plant data';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        echo "lalala";
        
        return 0;
    }
}
