﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Notes.Models
{
    public class NoteContext : DbContext
    {

        public NoteContext(DbContextOptions<NoteContext> options)
            :base(options)
        {
        }

        public DbSet<NoteItem> NoteItems { get; set; }

    }
}
