@@ .. @@
  const handleDeleteStudent = async (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const { error } = await deleteStudent(id);
      
      if (error) {
        toast.error('Failed to delete student');
      } else {
        toast.success('Student deleted successfully');
      }
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const { error } = await updateStudent(editingStudent.id, {
      class_id: editingStudent.class_id,
      parent_name: editingStudent.parent_name,
      parent_email: editingStudent.parent_email,
      parent_phone: editingStudent.parent_phone,
      status: editingStudent.status,
    });

    if (error) {
      toast.error('Failed to update student');
    } else {
      toast.success('Student updated successfully');
      setEditingStudent(null);
    }
  };

  const filteredStudents = students.filter(student => {